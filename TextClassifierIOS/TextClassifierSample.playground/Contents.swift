import CreateML
import Foundation
import PlaygroundSupport
import NaturalLanguage

// train model

let url = Bundle.main.url(forResource: "data", withExtension: "json")!
let data = try MLDataTable(contentsOf: url)
let (trainingData, testingData) = data.randomSplit(by: 0.8, seed: 5)
let classifier = try MLTextClassifier(trainingData: trainingData,
                                               textColumn: "text",
                                               labelColumn: "label")

let trainingAccuracy = (1.0 - classifier.trainingMetrics.classificationError) * 100
let validationAccuracy = (1.0 - classifier.validationMetrics.classificationError) * 100
let precisionRecall = classifier.validationMetrics.precisionRecall
let confusion = classifier.validationMetrics.confusion
let evaluationMetrics = classifier.evaluation(on: testingData)
let evaluationAccuracy = (1.0 - evaluationMetrics.classificationError) * 100

print(precisionRecall)
print(confusion)


// export model

let metadata = MLModelMetadata(author: "Yusuke Ariyoshi",
                               shortDescription: "A sample model trained to classify text",
                               version: "1.0")
let exportPath = playgroundSharedDataDirectory.appendingPathComponent("TextClassifier.mlmodel")
try classifier.write(to: exportPath, metadata: metadata)


// try model
//let textClassifier = try NLModel(mlModel: TextClassifier().model)
//textClassifier.predictedLabel(for: "It was the best I've ever seen!")
