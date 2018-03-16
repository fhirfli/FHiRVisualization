# FHiR Integration Visualization Tests
### Setup instructions
1. Download Selenium webdriver: selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar
2. Download chromedriver: https://chromedriver.storage.googleapis.com/index.html?path=2.35/
3. Place both files in this directory.
### Running Tests
#### Standalone Tests
This mode is to run the tests once to check the system works, if you are developing extra integration tests, we recommend you use the Development Tests command.  
___Note:  if running on mac, you may need to edit package.json___
    
1. To start, simply run ```yarn run standalone```

#### Development Tests
1. Build the frontend using ```yarn run build```
2. Start the webdriver using ```yarn run webdriver```
3. Start the integration test server using ```yarn run server```
4. Run tests using ```yarn run test```

