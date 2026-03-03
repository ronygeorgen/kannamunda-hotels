import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ronygeorge.jacg@gmail.com',
            subject: `New Inquiry: ${firstName} ${lastName}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 24px rgba(0,0,0,0.05);">
                    <div style="background-color: #72091d; padding: 40px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">NEW INQUIRY</h1>
                        <p style="color: rgba(255,255,255,0.7); margin: 10px 0 0 0; text-transform: uppercase; font-size: 12px; letter-spacing: 3px;">Kannamundayil Residency</p>
                    </div>

                    <div style="padding: 40px;">
                        <div style="border-left: 4px solid #72091d; padding-left: 20px; margin-bottom: 40px;">
                            <h2 style="color: #1a1a1a; margin: 0 0 5px 0; font-size: 20px;">Inquiry Details</h2>
                            <p style="color: #666; margin: 0; font-size: 14px;">Incoming message from the contact page</p>
                        </div>

                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Full Name</div>
                                    <div style="font-size: 16px; color: #1a1a1a; font-weight: 500;">${firstName} ${lastName}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px;">Email Address</div>
                                    <div style="font-size: 16px; color: #0066cc; font-weight: 500;">${email}</div>
                                </td>
                            </tr>
                        </table>

                        <div style="margin-top: 30px; background-color: #f9f9f9; padding: 25px; border-radius: 8px;">
                            <div style="font-size: 11px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Message</div>
                            <div style="font-size: 14px; color: #444; line-height: 1.6; white-space: pre-wrap;">
                                "${message}"
                            </div>
                        </div>

                        <div style="margin-top: 40px; text-align: center;">
                            <a href="mailto:${email}" style="background-color: #1a1a1a; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Reply to Message</a>
                        </div>
                    </div>

                    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee;">
                        &copy; 2026 Kannamundayil Residency. All rights reserved. <br/>
                        This is an automated message from the website contact form.
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
