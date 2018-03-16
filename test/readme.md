# FHiR Visualization Tests
### Setup instructions
1. Download Selenium webdriver: selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar
2. Download chromedriver: https://chromedriver.storage.googleapis.com/index.html?path=2.35/
3. Place both files in this directory.
4. Run 
- Windows: 
```
java -jar -Dwebdriver.chrome.driver=chromedriver.exe selenium-server-standalone-3.0.1.jar
```
- Linux:
```
java -jar -Dwebdriver.chrome.driver=chromedriver selenium-server-standalone-3.0.1.jar
```
(Note: these commands should continue running indeterminately - if they exit an error has occurred)
5. Run ```yarn run tests```
