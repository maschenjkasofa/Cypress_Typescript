@api
Feature: Goals folder

  Scenario: Get list of all Goals
    Given My User is logged in
    When My User sent request to get all Goals
    Then My Status code from Get should be 200

  Scenario: Create new Goal
    When User Sent POST request to Create a new Goal from file 'goal/create_goal.json'
  
  Scenario: Get Goal by ID
    When User send Get request to get Goal by ID 
    Then Status code from Get Goal by ID should be 200

  Scenario: Delete existing Goal
    When User Sent DELETE request to Delete existing Goal
    Then Status code from Delete should be 200

  Scenario: Create KeyResults 
    When User Sent POST request to Create KeyResults from file 'key_results/create_keyresults.json'
    Then Status code from Create KeyResults request should be 200

   Scenario: Edit KeyResults 
    When User Sent PUT request to Edit KeyResults from file 'key_results/edit_keyresults.json'
    Then Status code from Edit KeyResults request should be 200