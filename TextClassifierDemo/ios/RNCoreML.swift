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
      let model = NamesDT()!
      let output = try model.prediction(fromInput: features(from: source) as [String : NSNumber])
      resolve([
        "gender": output.classLabel,
        "probability": output.classProbability,
        ])
    } catch {
      reject(nil, nil, nil);
    }
  }
  
  private func features(from string: String) -> [String: Double] {
    guard !string.isEmpty else {
      return [:]
    }
    
    let string = string.lowercased()
    var keys = [String]()
    
    keys.append("first-letter=\(string.prefix(1))")
    keys.append("first2-letters=\(string.prefix(2))")
    keys.append("first3-letters=\(string.prefix(3))")
    keys.append("last-letter=\(string.suffix(1))")
    keys.append("last2-letters=\(string.suffix(2))")
    keys.append("last3-letters=\(string.suffix(3))")
    
    return keys.reduce([String: Double]()) { (result, key) -> [String: Double] in
      var result = result
      result[key] = 1.0
      return result
    }
  }
}
