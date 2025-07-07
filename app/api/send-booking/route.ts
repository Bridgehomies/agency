// // /app/api/send-booking/route.ts
// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY); // Add this key to .env.local

// export async function POST(req: Request) {
//   const body = await req.json();

//   try {
//     const data = await resend.emails.send({
//       from: "Your Booking Form <your@domain.com>", // This must match a verified domain
//       to: ["yourgmail@gmail.com"],
//       subject: "New Booking Received",
//       html: `
//         <h2>New Booking</h2>
//         <p><strong>Name:</strong> ${body.name}</p>
//         <p><strong>Email:</strong> ${body.email}</p>
//         <p><strong>Phone:</strong> ${body.phone}</p>
//         <p><strong>Company:</strong> ${body.company}</p>
//         <p><strong>Message:</strong> ${body.message}</p>
//         <p><strong>Consultation Type:</strong> ${body.consultation_type}</p>
//         <p><strong>Date:</strong> ${body.date}</p>
//         <p><strong>Time:</strong> ${body.time}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
//   }
// }
