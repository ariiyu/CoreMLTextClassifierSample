//
//  RNCoreMLBridge.swift
//  CoreMLTextClassifierSample
//
//  Created by Ary on 2019/05/06.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNCoreML, NSObject)

RCT_EXTERN_METHOD(predict:(NSString *)source findEventsWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
