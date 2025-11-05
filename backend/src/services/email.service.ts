import { createTransporter, emailConfig } from '../config/email.config.js';
import { renderTemplate } from '../utils/email.utils.js';
import type { SendMailOptions } from 'nodemailer';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  template?: string;
  context?: Record<string, any>;
  html?: string;
  text?: string;
  attachments?: any[];
}

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createTransporter();
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      let htmlContent = options.html;

      if (options.template && options.context) {
        htmlContent = await renderTemplate(options.template, options.context);
      }

      const mailOptions: SendMailOptions = {
        from: emailConfig.from,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: htmlContent,
        text: options.text,
        attachments: options.attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, userName: string): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: 'Welcome to ELM AI Task!',
      template: 'welcome',
      context: {
        userName,
        appName: 'ELM AI Task',
        loginUrl: `${process.env.DOMAIN || 'http://localhost:5173'}/login`,
      },
    });
  }

  async sendPasswordResetEmail(
    to: string,
    userName: string,
    resetToken: string
  ): Promise<boolean> {
    const resetUrl = `${process.env.DOMAIN || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    return this.sendEmail({
      to,
      subject: 'Password Reset Request',
      template: 'reset-password',
      context: {
        userName,
        resetUrl,
        expiryTime: '1 hour',
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    userName: string,
    verificationToken: string
  ): Promise<boolean> {
    const verificationUrl = `${process.env.DOMAIN || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
    
    return this.sendEmail({
      to,
      subject: 'Verify Your Email Address',
      template: 'verify-email',
      context: {
        userName,
        verificationUrl,
      },
    });
  }

  async sendNotificationEmail(
    to: string,
    userName: string,
    title: string,
    message: string,
    actionUrl?: string,
    actionText?: string
  ): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: title,
      template: 'notification',
      context: {
        userName,
        title,
        message,
        actionUrl,
        actionText,
      },
    });
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service is ready to send emails');
      return true;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
