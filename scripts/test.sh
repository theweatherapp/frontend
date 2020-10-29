rm -rf cypress/results
http-server dist -s &
echo "HTTP Server Started, Starting Test"
cypress run --config-file=config/cypress.json
TEST_RESULT=$?
echo "Test Finished, Generating Report"
mochawesome-merge ./cypress/results/json/*.json -o cypress/results/mochawesome-bundle.json&> /dev/null 
marge cypress/results/mochawesome-bundle.json -o dist/test_report&> /dev/null 
mv dist/test_report/mochawesome-bundle.html dist/test_report/index.html&> /dev/null 
rm -rf cypress/results
echo "Done!"
exit $TEST_RESULT