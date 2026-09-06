import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { differenceInHours, differenceInDays, parseISO } from "date-fns";

admin.initializeApp();
const db = admin.firestore();

/**
 * Trigger: Immediately when an appointment document is created
 * Sends in-app notifications to both the veterinarian and pet owner.
 */
export const onAppointmentCreated = functions.firestore
  .document("appointments/{appointmentId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data) return;

    const appointmentId = context.params.appointmentId;
    const now = new Date().toISOString();

    // 1. Notify Veterinarian
    await db.collection("notifications").add({
      userId: data.vetId,
      title: "New Appointment Booked",
      message: `${data.ownerName} scheduled a visit for ${data.petName} (${data.serviceType}) on ${new Date(data.dateTime).toLocaleDateString()}.`,
      type: "booking_confirmed",
      isRead: false,
      link: "/vet-dashboard/appointments",
      createdAt: now,
    });

    // 2. Notify Pet Owner
    await db.collection("notifications").add({
      userId: data.ownerId,
      title: "Appointment Request Submitted",
      message: `Your booking for ${data.petName} with ${data.vetName} has been received and is pending doctor confirmation.`,
      type: "booking_confirmed",
      isRead: false,
      link: "/portal/appointments",
      createdAt: now,
    });

    functions.logger.info(`Notification dispatched for appointment ${appointmentId}`);
  });

/**
 * Trigger: When a veterinarian creates a new medical record
 * Instantly alerts the pet parent that clinical exam notes & prescriptions have been published.
 */
export const onMedicalRecordCreated = functions.firestore
  .document("medical_records/{recordId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data) return;

    const now = new Date().toISOString();

    await db.collection("notifications").add({
      userId: data.ownerId,
      title: "Clinical Exam Dossier Published",
      message: `${data.vetName} completed a consultation for ${data.petName}. Diagnosis: ${data.diagnosis}. Prescriptions are now viewable.`,
      type: "record_updated",
      isRead: false,
      link: "/portal/records",
      createdAt: now,
    });

    functions.logger.info(`Medical record notification sent to owner ${data.ownerId}`);
  });

/**
 * Scheduled Cron: 24-Hour Appointment Reminders
 * Runs every hour to check appointments between 23 and 25 hours away.
 */
export const sendAppointmentReminders = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async (context) => {
    const now = new Date();
    const aptSnap = await db
      .collection("appointments")
      .where("status", "==", "confirmed")
      .get();

    for (const doc of aptSnap.docs) {
      const apt = doc.data();
      const aptDate = parseISO(apt.dateTime);
      const hoursRemaining = differenceInHours(aptDate, now);

      // Check if within 24h window
      if (hoursRemaining >= 23 && hoursRemaining <= 25) {
        // Prevent duplicate reminders
        const existing = await db
          .collection("notifications")
          .where("userId", "==", apt.ownerId)
          .where("type", "==", "appointment_reminder")
          .get();

        const alreadySent = existing.docs.some((nDoc) => {
          const n = nDoc.data();
          return n.message.includes(apt.petName);
        });

        if (!alreadySent) {
          await db.collection("notifications").add({
            userId: apt.ownerId,
            title: `Appointment Reminder: Tomorrow at ${new Date(apt.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            message: `Reminder: ${apt.petName}'s appointment with ${apt.vetName} is in 24 hours.`,
            type: "appointment_reminder",
            isRead: false,
            link: "/portal/appointments",
            createdAt: now.toISOString(),
          });
        }
      }
    }
  });

/**
 * Scheduled Cron: Vaccination Due & Overdue Alerts
 * Runs every morning at 09:00 AM UTC.
 */
export const sendVaccineReminders = functions.pubsub
  .schedule("0 9 * * *")
  .onRun(async (context) => {
    const now = new Date();
    const vacSnap = await db.collection("vaccinations").get();

    for (const doc of vacSnap.docs) {
      const vac = doc.data();
      const dueDate = parseISO(vac.nextDueDate);
      const daysUntilDue = differenceInDays(dueDate, now);

      if (daysUntilDue <= 14 && daysUntilDue >= 0) {
        await db.collection("notifications").add({
          userId: vac.ownerId,
          title: `Booster Due Soon: ${vac.vaccineName}`,
          message: `${vac.petName}'s ${vac.vaccineName} booster is due on ${vac.nextDueDate}. Schedule an update appointment.`,
          type: "vaccination_due",
          isRead: false,
          link: "/portal/records",
          createdAt: now.toISOString(),
        });
      } else if (daysUntilDue < 0) {
        await db.collection("notifications").add({
          userId: vac.ownerId,
          title: `URGENT: ${vac.vaccineName} Booster Overdue`,
          message: `${vac.petName}'s ${vac.vaccineName} was due on ${vac.nextDueDate} and is now overdue. Please protect your pet.`,
          type: "vaccination_due",
          isRead: false,
          link: "/portal/records",
          createdAt: now.toISOString(),
        });
      }
    }
  });
