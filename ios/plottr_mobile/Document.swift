//
//  Document.swift
//  plottr_mobile
//
//  Created by Cameron Sutter on 5/14/20.
//

import UIKit

class PlottrDocument: UIDocument {

  var stringData = ""

  func stringContents() -> String {
    return stringData
  }

  func updateStringContents(data: String) {
    stringData = data
  }

  // save
  override func contents(forType typeName: String) throws -> Any {
    return stringData.data(using: .utf8)!
  }

  // read
  override func load(fromContents contents: Any, ofType typeName: String?) throws {
    stringData = String(data: contents as! Data, encoding: .utf8)!
  }

  /*
  override func fileAttributesToWrite(to url: URL, for saveOperation: UIDocumentSaveOperation) throws -> [AnyHashable : Any] {
    let thumbnail = UIImage(named: "PlottrDocumentIcon")
    return [URLResourceKey.hasHiddenExtensionKey: true, URLResourceKey.thumbnailDictionaryKey: [ URLThumbnailDictionaryItem.NSThumbnail1024x1024SizeKey: thumbnail ] ]
  }
  */
}

