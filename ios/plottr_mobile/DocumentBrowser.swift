//
//  DocumentBrowser.swift
//  plottr_mobile
//
//  Created by Cameron Sutter on 8/17/20.
//

import UIKit

@objc(DocumentBrowser)
class DocumentBrowserViewController: UIDocumentBrowserViewController, UIDocumentBrowserViewControllerDelegate {
  
  @objc static func requiresMainQueueSetup() -> Bool {
      return true
  }

  override func viewDidLoad() {
    super.viewDidLoad()

    delegate = self

    allowsDocumentCreation = true
    allowsPickingMultipleItems = false
    shouldShowFileExtensions = false
    localizedCreateDocumentActionTitle = "New Plottr Project"

    // Update the style of the UIDocumentBrowserViewController
    //  browserUserInterfaceStyle = .dark
    view.tintColor = .orange
    let cancelbutton = UIBarButtonItem(title: "Cancel", style: .plain, target: self, action: #selector(cancelButton(sender:)))
    additionalTrailingNavigationBarButtonItems = [cancelbutton]

  }
  
  @objc func openBrowser() -> Void {
    DispatchQueue.main.async {
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appDelegate.openDocumentBrowser()
    }
  }
  
  @objc func closeBrowser() -> Void {
    DispatchQueue.main.async {
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appDelegate.closeDocumentBrowser()
    }
  }
  
  @objc func cancelButton(sender: UIBarButtonItem) {
    DispatchQueue.main.async {
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appDelegate.closeDocumentBrowser()
    }
  }

  // MARK: UIDocumentBrowserViewControllerDelegate

  func documentBrowser(_ controller: UIDocumentBrowserViewController, didRequestDocumentCreationWithHandler importHandler: @escaping (URL?, UIDocumentBrowserViewController.ImportMode) -> Void) {
    
    // Make sure the importHandler is always called, even if the user cancels the creation request.
    let alert = UIAlertController(title: "What is the project's name?", message: nil, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { _ in
      importHandler(nil, .none)
    }))

    alert.addTextField(configurationHandler: { textField in
      textField.placeholder = "Project name..."
    })

    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { action in

      if let name = alert.textFields?.first?.text {

        let documentDirectory = FileManager.default.temporaryDirectory
        var escapedFileName = name.replacingOccurrences(of: " ", with: "_")
        escapedFileName = "\(escapedFileName).pltr"
        let fileURL = documentDirectory.appendingPathComponent(escapedFileName)
        let doc = PlottrDocument(fileURL: fileURL)
        DocumentViewController._sharedInstance?.document = doc
        let basicJSON = "{\"storyName\":\"\(name)\", \"newFile\":true}"

        doc.updateStringContents(data: basicJSON)
        doc.save(to: fileURL, for: .forCreating) { (saveSuccess) in
          // Make sure the document saved successfully.
          guard saveSuccess else {
            importHandler(nil, .none)
            return
          }
          // Close the document.
          doc.close(completionHandler: { (closeSuccess) in
            guard closeSuccess else {
              importHandler(nil, .none)
              return
            }
            // Pass the document's temporary URL to the import handler.
            importHandler(fileURL, .move)
          })
        }
      } else { importHandler(nil, .none) }
    }))

    self.present(alert, animated: true)
  }

  func documentBrowser(_ controller: UIDocumentBrowserViewController, didImportDocumentAt sourceURL: URL, toDestinationURL destinationURL: URL) {
    let doc = PlottrDocument(fileURL: destinationURL)
    DocumentViewController._sharedInstance?.document = doc
    // Access the document
    doc.open(completionHandler: { (success) in
      if success {
        self.presentDocument(at: destinationURL, json: doc.stringContents())
      } else {
        print("failed to open file")
      }
    })
  }

  
  func documentBrowser(_ controller: UIDocumentBrowserViewController, didPickDocumentsAt documentURLs: [URL]) {
    guard let sourceURL = documentURLs.first else { return }
    let doc = PlottrDocument(fileURL: sourceURL)
    DocumentViewController._sharedInstance?.document = doc
    // Access the document
    doc.open(completionHandler: { (success) in
      if success {
        self.presentDocument(at: sourceURL, json: doc.stringContents())

      } else {
        print("failed to open file")
      }
    })
  }
  
  func documentBrowser(_ controller: UIDocumentBrowserViewController, failedToImportDocumentAt documentURL: URL, error: Error?) {
    // Make sure to handle the failed import appropriately, e.g., by presenting an error message to the user.
    // print("*** FAIL DOC \(error) ***\n")
    // print("*** FAIL DOC NAME \(documentURL) ***\n")
  }

  // MARK: Document Presentation
  func presentDocument(at documentURL: URL, json: String) {
    let initialData:NSDictionary = [
      "documentURL": documentURL.path,
      "data": json
    ]
    DocEvents.openDocument(data: initialData)
  }
  
  func closeDocument() {
    self.view.willRemoveSubview(DocumentViewController.sharedInstance()!.view)
    DocumentViewController.sharedInstance()?.removeFromParent()
  }
}
