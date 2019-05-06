//
//  RNCoreML.swift
//  CoreMLTextClassifierSample
//
//  Created by Ary on 2019/05/06.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import NaturalLanguage

@objc(RNCoreML)
class RNCoreML: NSObject {
  
  @objc(predict:findEventsWithResolver:rejecter:)
  func predict(source: String, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    do {
      let textClassifier = try NLModel(mlModel: TextClassifier()!.model!)
      let text = textClassifier.predictedLabel(for: source)
      resolve([
        "text": text,
        ])
    } catch {
      reject(nil, nil, nil);
    }
  }
}
