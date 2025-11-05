# Backend Architecture - Notification Services

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Express Application                      │
│                    (API Endpoints Layer)                     │
└────────────────────┬────────────────────┬───────────────────┘
                     │                    │
                     ▼                    ▼
        ┌────────────────────┐  ┌────────────────────┐
        │   Email Service    │  │   Slack Service    │
        │  (email.service)   │  │  (slack.service)   │
        └─────────┬──────────┘  └─────────┬──────────┘
                  │                       │
                  ▼                       ▼
        ┌────────────────────┐  ┌────────────────────┐
        │  Email Config      │  │  Slack Config      │
        │ (email.config)     │  │ (slack.config)     │
        └─────────┬──────────┘  └─────────┬──────────┘
                  │                       │
                  ▼                       ▼
        ┌────────────────────┐  ┌────────────────────┐
        │  Email Utils       │  │  Slack Utils       │
        │ (email.utils)      │  │ (slack.utils)      │
        └────────────────────┘  └────────────────────┘
                  │                       │
                  ▼                       ▼
        ┌────────────────────┐  ┌────────────────────┐
        │    Nodemailer      │  │  @slack/web-api    │
        │   (SMTP Client)    │  │   (Slack Client)   │
        └─────────┬──────────┘  └─────────┬──────────┘
                  │                       │
                  ▼                       ▼
        ┌────────────────────┐  ┌────────────────────┐
        │   Email Server     │  │   Slack API        │
        │  (Gmail, etc.)     │  │  (Slack Servers)   │
        └────────────────────┘  └────────────────────┘
```

## 🔄 Notification Flow

### User Registration Example

```
User Registration Request
         │
         ▼
┌─────────────────────┐
│  POST /api/register │
│   (API Endpoint)    │
└──────────┬──────────┘
           │
           ├─────────────────────────┐
           │                         │
           ▼                         ▼
┌──────────────────────┐   ┌──────────────────────┐
│  Email Service       │   │  Slack Service       │
│  sendWelcomeEmail()  │   │  sendWelcomeNotif()  │
└──────────┬───────────┘   └──────────┬───────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐   ┌──────────────────────┐
│  Send to User        │   │  Send to Team        │
│  (user@example.com)  │   │  (#notifications)    │
└──────────────────────┘   └──────────────────────┘
```

## 📦 Service Layer Design

### Email Service

```typescript
EmailService
├── Configuration
│   ├── SMTP Host & Port
│   ├── Authentication
│   └── From Address
├── Methods
│   ├── sendEmail()              // Generic email sender
│   ├── sendWelcomeEmail()       // User welcome
│   ├── sendPasswordResetEmail() // Password reset
│   ├── sendVerificationEmail()  // Email verification
│   ├── sendNotificationEmail()  // Custom notifications
│   └── verifyConnection()       // Test connection
└── Templates
    ├── welcome.ejs
    ├── reset-password.ejs
    ├── verify-email.ejs
    └── notification.ejs
```

### Slack Service

```typescript
SlackService
├── Configuration
│   ├── Bot Token
│   ├── Webhook URL
│   ├── Channel ID
│   └── Enabled Flag
├── Methods
│   ├── sendMessage()                    // Generic message sender
│   ├── sendWelcomeNotification()        // User welcome
│   ├── sendPasswordResetNotification()  // Password reset
│   ├── sendVerificationNotification()   // Email verification
│   ├── sendGeneralNotification()        // Custom notifications
│   ├── sendErrorNotification()          // Error alerts
│   ├── sendPostCreatedNotification()    // Post creation
│   ├── sendRichMessage()                // Block Kit messages
│   └── verifyConnection()               // Test connection
└── Formatting
    ├── Block Kit Builders
    ├── Message Templates
    └── Text Utilities
```

## 🎯 Use Cases

### 1. User Authentication Flow

```
┌──────────────┐
│ User Signs Up│
└──────┬───────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
┌─────────────────┐            ┌─────────────────┐
│ Email to User   │            │ Slack to Team   │
│ "Welcome!"      │            │ "New user: John"│
└─────────────────┘            └─────────────────┘
```

### 2. Error Monitoring Flow

```
┌──────────────┐
│ Error Occurs │
└──────┬───────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
┌─────────────────┐            ┌─────────────────┐
│ Log to Console  │            │ Alert on Slack  │
│ (for debugging) │            │ (team notified) │
└─────────────────┘            └─────────────────┘
```

### 3. Post Creation Flow

```
┌──────────────┐
│ Post Created │
└──────┬───────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
┌─────────────────┐            ┌─────────────────┐
│ Email to        │            │ Slack to Team   │
│ Followers       │            │ "New post!"     │
│ (optional)      │            │ with link       │
└─────────────────┘            └─────────────────┘
```

## 🔧 Configuration Management

```
Environment Variables (.env)
         │
         ▼
┌─────────────────────────────┐
│  Configuration Files        │
│  ├── email.config.ts        │
│  └── slack.config.ts        │
└──────────┬──────────────────┘
           │
           ├─────────────────────────┐
           │                         │
           ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│ Email Service    │      │ Slack Service    │
│ (uses config)    │      │ (uses config)    │
└──────────────────┘      └──────────────────┘
```

## 🛡️ Error Handling Strategy

```
┌─────────────────┐
│ Service Method  │
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │ Try    │
    └───┬────┘
        │
        ├─── Success ──────────────┐
        │                          │
        ├─── Failure ──────────┐   │
        │                      │   │
        ▼                      ▼   ▼
┌──────────────┐      ┌──────────────┐
│ Log Error    │      │ Return Result│
│ Throw/Return │      │ (true/false) │
└──────────────┘      └──────────────┘
```

## 📊 Data Flow

### Sending a Notification

```
1. API Endpoint Receives Request
         │
         ▼
2. Extract User Data
         │
         ▼
3. Call Service Method(s)
         │
         ├─────────────────────┐
         │                     │
         ▼                     ▼
4a. Email Service      4b. Slack Service
    - Load config          - Load config
    - Format message       - Format message
    - Send via SMTP        - Send via API
         │                     │
         ▼                     ▼
5a. Email Delivered    5b. Slack Posted
         │                     │
         └─────────┬───────────┘
                   ▼
6. Return Success/Failure to API
         │
         ▼
7. Send Response to Client
```

## 🎨 Message Formatting

### Email Templates (EJS)

```
Template File (welcome.ejs)
         │
         ▼
Context Data (userName, appName, etc.)
         │
         ▼
EJS Rendering Engine
         │
         ▼
HTML Email Output
         │
         ▼
Nodemailer Transport
```

### Slack Block Kit

```
Message Options
         │
         ▼
Block Builder Utility
         │
         ▼
Slack Block Kit JSON
         │
         ▼
Slack Web API Client
         │
         ▼
Formatted Slack Message
```

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│  Environment Variables (.env)       │
│  - Never committed to git           │
│  - Loaded at runtime                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Configuration Layer                │
│  - Validates credentials            │
│  - Provides defaults                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Service Layer                      │
│  - Checks if enabled                │
│  - Handles errors gracefully        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  External APIs                      │
│  - SMTP Server (Email)              │
│  - Slack API (Slack)                │
└─────────────────────────────────────┘
```

## 🚀 Scalability Considerations

### Current Architecture
- Synchronous notification sending
- Direct API calls
- Suitable for low-to-medium traffic

### Future Enhancements
```
┌─────────────────┐
│ API Endpoint    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Message Queue   │  ← Add queue for high volume
│ (Redis/RabbitMQ)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Worker Process  │  ← Process notifications async
└────────┬────────┘
         │
         ├─────────────────────┐
         │                     │
         ▼                     ▼
┌──────────────┐      ┌──────────────┐
│ Email Service│      │ Slack Service│
└──────────────┘      └──────────────┘
```

## 📈 Monitoring & Logging

```
Service Method Called
         │
         ▼
┌─────────────────┐
│ Log: Attempt    │
└────────┬────────┘
         │
         ▼
    Execute
         │
         ├─── Success ────────┐
         │                    │
         ├─── Failure ────┐   │
         │                │   │
         ▼                ▼   ▼
┌──────────────┐  ┌──────────────┐
│ Log: Error   │  │ Log: Success │
│ Send Alert   │  │ (optional)   │
└──────────────┘  └──────────────┘
```

## 🎯 Best Practices Implemented

1. **Separation of Concerns**
   - Config, Service, and Utils are separate
   - Each layer has a single responsibility

2. **Consistent API Design**
   - Email and Slack services mirror each other
   - Similar method signatures and patterns

3. **Error Handling**
   - Try-catch blocks in all service methods
   - Graceful degradation when services are disabled

4. **Type Safety**
   - Full TypeScript coverage
   - Interfaces for all options and configs

5. **Environment-Based Config**
   - All credentials from environment variables
   - Easy to disable services with flags

6. **Logging**
   - Console logs for debugging
   - Error logs for troubleshooting

---

This architecture provides a solid foundation for notification services that can scale with your application's needs.
