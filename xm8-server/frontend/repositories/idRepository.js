import $ from 'jquery';

export const getNextId = (success, error) => {
  $.ajax({
    url: '/api/id/next',
    type: 'GET',
    contentType:'application/json',
    success: function(response) {
      success(response);
    },
    error: function(response) {
      if(error) {
        error(response);
      } else {
        console.log("Failed to retrieve a new id");
      }
    }
  });            
}
