import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
  }

  private async createTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get('EMAIL_USER'),
          pass: this.configService.get('EMAIL_PASSWORD'),
        },
      });

      // Verify the connection
      await this.transporter.verify();
      console.log('SMTP connection established successfully');
    } catch (error) {
      console.error('Error creating email transporter:', error);
    }
  }

  async sendTicketConfirmation(
    to: string,
    ticketDetails: {
      ticketId: string;
      journeyDate: Date;
      destination: string;
      seatNumber: string;
    },
  ) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Bus Ticket Confirmation',
      html: `
        <h1>Ticket Confirmation</h1>
        <p>Dear Passenger,</p>
        <p>Your bus ticket has been confirmed. Here are the details:</p>
        <ul>
          <li>Ticket ID: ${ticketDetails.ticketId}</li>
          <li>Journey Date: ${new Date(ticketDetails.journeyDate).toLocaleDateString()}</li>
          <li>Destination: ${ticketDetails.destination}</li>
          <li>Seat Number: ${ticketDetails.seatNumber}</li>
        </ul>
        <p>Thank you for choosing our service!</p>
      `,
    };

    try {
      console.log('Attempting to send ticket confirmation email with options:', {
        to: mailOptions.to,
        from: mailOptions.from,
        subject: mailOptions.subject
      });
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Ticket confirmation email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending ticket confirmation email - Full error:', error);
      console.error('Email configuration:', {
        user: process.env.EMAIL_USER,
        error: error.message,
        code: error.code,
        command: error.command
      });
      return false;
    }
  }

  async sendPasswordReset(to: string, resetToken: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>You have requested to reset your password. Click the link below to proceed:</p>
        <p>
          <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
