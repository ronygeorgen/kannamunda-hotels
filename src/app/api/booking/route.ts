import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { checkIn, checkOut, room, adults, children, phone, name, email, notes } = body;

        // Note: You must run 'npm install nodemailer' and set these in your .env
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your sender email
                pass: process.env.EMAIL_PASS, // Your App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ronygeorge.jacg@gmail.com',
            subject: `New Booking Request: ${name} - ${room.toUpperCase()}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 24px rgba(0,0,0,0.05);">
                    <div style="background-color: #72091d; padding: 40px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">RESERVATION REQUEST</h1>
                        <p style="color: rgba(255,255,255,0.7); margin: 10px 0 0 0; text-transform: uppercase; font-size: 12px; letter-spacing: 3px;">Kannamundayil Residency</p>
                    </div>

                    <div style="padding: 40px;">
                        <div style="border-left: 4px solid #72091d; padding-left: 20px; margin-bottom: 40px;">
                            <h2 style="color: #1a1a1a; margin: 0 0 5px 0; font-size: 20px;">Guest Details</h2>
                            <p style="color: #666; margin: 0; font-size: 14px;">Incoming request for a new room reservation</p>
                        </div>

                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Full Name</div>
                                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 500;">${name}</div>
                                </td>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Phone</div>
                                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 500;">${phone}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Email Address</div>
                                    <div style="font-size: 16px; color: #0066cc; font-weight: 500;">${email}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Check-In Date</div>
                                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 500;">${checkIn}</div>
                                </td>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Check-Out Date</div>
                                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 500;">${checkOut}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Room Type</div>
                                    <div style="font-size: 15px; background-color: #72091d; color: white; display: inline-block; padding: 2px 10px; border-radius: 4px; text-transform: capitalize; margin-top: 5px;">${room}</div>
                                </td>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Guest Count</div>
                                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 500;">${adults} Adults, ${children || 0} Children</div>
                                </td>
                            </tr>
                        </table>

                        <div style="margin-top: 30px; background-color: #f9f9f9; padding: 25px; border-radius: 8px;">
                            <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Guest Notes</div>
                            <div style="font-size: 14px; color: #444; line-height: 1.6; font-style: italic;">
                                "${notes || 'No special requests provided.'}"
                            </div>
                        </div>

                        <div style="margin-top: 40px; text-align: center;">
                            <a href="mailto:${email}" style="background-color: #1a1a1a; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Reply to Guest</a>
                        </div>
                    </div>

                    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee;">
                        &copy; 2026 Kannamundayil Residency. All rights reserved. <br/>
                        This is an automated request from your website booking portal.
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
