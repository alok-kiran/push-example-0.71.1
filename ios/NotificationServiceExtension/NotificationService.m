#import "NotificationService.h"
#import "FirebaseMessaging.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    NSString *imageUrlString = request.content.userInfo[@"image"];
    if (imageUrlString) {
        NSURL *imageUrl = [NSURL URLWithString:imageUrlString];
        
        UNNotificationAttachment *imageAttachment = [UNNotificationAttachment attachmentWithIdentifier:@"imageAttachment" URL:imageUrl options:nil error:nil];
        
        if (imageAttachment) {
            self.bestAttemptContent.attachments = @[imageAttachment];
        }
    }
    
    // Populate the notification content using Firebase Messaging extensionHelper
    [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
