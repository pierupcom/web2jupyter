chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'convertToNotebook') {
      var webpage = document.documentElement.outerHTML;
      var vector = convertToVector(webpage);
      var trackers = detectTrackers(webpage);
      var notebook = generateJupyterNotebook(vector, trackers);
      downloadNotebook(notebook);
    }
  });
  
  function convertToVector(webpage) {
    // Advanced webpage to vector conversion logic
    // ...
  }
  
  function detectTrackers(webpage) {
    var trackers = [];
  
    // Regular expressions to match known tracking patterns
    var trackerPatterns = [
      /google-analytics\.com/,
      /googletagmanager\.com/,
      /doubleclick\.net/,
      /facebook\.net/,
      /twitter\.com/,
      // Add more tracker patterns as needed
    ];
  
    // Parse the webpage HTML
    var parser = new DOMParser();
    var doc = parser.parseFromString(webpage, 'text/html');
  
    // Find all script and img tags
    var scripts = doc.getElementsByTagName('script');
    var images = doc.getElementsByTagName('img');
  
    // Check script tags for trackers
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      var src = script.src;
      for (var j = 0; j < trackerPatterns.length; j++) {
        if (trackerPatterns[j].test(src)) {
          trackers.push(src);
          break;
        }
      }
    }
  
    // Check img tags for trackers
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      var src = image.src;
      for (var j = 0; j < trackerPatterns.length; j++) {
        if (trackerPatterns[j].test(src)) {
          trackers.push(src);
          break;
        }
      }
    }
  
    return trackers;
  }
  
  function generateJupyterNotebook(vector, trackers) {
    // Generate a Jupyter Notebook from the vector representation and trackers
    var notebook = {
      cells: [
        {
          cell_type: 'markdown',
          metadata: {},
          source: ['# Webpage Analysis\n\n## Vector Representation\n\nHere is the vector representation of the webpage:']
        },
        {
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: ['vector = ' + JSON.stringify(vector)]
        },
        {
          cell_type: 'markdown',
          metadata: {},
          source: ['## Privacy Report\n\nTrackers found on the webpage:']
        },
        {
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: [
            'trackers = ' + JSON.stringify(trackers),
            '',
            'print("Website URL | Trackers URL | Number of Trackers")',
            'print("-" * 50)',
            'print(f"{window.location.href} | {", ".join(trackers)} | {len(trackers)}")'
          ]
        },
        {
          cell_type: 'markdown',
          metadata: {},
          source: ['## Analysis\n\nYou can perform further analysis on the vector representation and trackers here.']
        },
        {
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: [
            'import numpy as np',
            'import matplotlib.pyplot as plt',
            '',
            '# Perform analysis on the vector and trackers',
            '# Example: Plot the vector values',
            'plt.plot(vector)',
            'plt.xlabel("Term Index")',
            'plt.ylabel("Term Frequency")',
            'plt.title("Webpage Vector Representation")',
            'plt.show()',
            '',
            '# Example: Print the number of trackers found',
            'print(f"Number of trackers found: {len(trackers)}")'
          ]
        }
      ],
      metadata: {
        kernelspec: {
          display_name: 'Python 3',
          language: 'python',
          name: 'python3'
        },
        language_info: {
          codemirror_mode: {
            name: 'ipython',
            version: 3
          },
          file_extension: '.py',
          mimetype: 'text/x-python',
          name: 'python',
          nbconvert_exporter: 'python',
          pygments_lexer: 'ipython3',
          version: '3.8.5'
        }
      },
      nbformat: 4,
      nbformat_minor: 4
    };
    return notebook;
  }
  
  function downloadNotebook(notebook) {
    var notebookJSON = JSON.stringify(notebook);
    var blob = new Blob([notebookJSON], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'webpage_notebook.ipynb';
    a.click();
  }
  
  // Stemmer implementation (Porter stemmer)
  function Stemmer() {
    // Stemmer code implementation
    // ...
  }