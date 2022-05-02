// hospitals.js
/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
 async function postFormData({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData);

	const response = await fetch(url + new URLSearchParams(plainFormData));

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}

function clearContent(elementID) {
	document.getElementById(elementID).innerHTML = "";
}

function setResultStyle(){
	var myEles = document.getElementById('results');
	for(var i=0; i<myEles.length; i++){
	         myEles[i].setAttribute('class', "results");
	    }
	}


function printResults(results) {
	clearContent("results");
	var mainContainer = document.getElementById("results");
	var tr = document.createElement("tr");
	tr.innerHTML = '<td style=\"border: 2px solid black;\"><b>Hospital Name</b></td>';
	mainContainer.appendChild(tr);

	for (var i = 0; i < results.length; i++) {
	  var tr = document.createElement("tr");
	  tr.innerHTML = '<td style=\"border: 2px solid black;\">' + results[i].name + '</td>';
	  tr.setAttribute('border', '2');
	  mainContainer.appendChild(tr);
	}


}



async function handleFormSubmit(event) {
	/**
	 * This prevents the default behaviour of the browser submitting
	 * the form so that we can handle things instead.
	 */
	event.preventDefault();

	/**
	 * This gets the element which the event handler was attached to.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
	 */
	const form = event.currentTarget;

	/**
	 * This takes the API URL from the form's `action` attribute.
	 */
	const url = form.action;

	try {
		/**
		 * This takes all the fields in the form and makes their values
		 * available through a `FormData` instance.
		 * 
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
		 */
		const formData = new FormData(form);

		/**
		 * We'll define the `postFormDataAsJson()` function in the next step.
		 */
		const responseData = await postFormData({ url, formData });
		if (formData.get('pedStatus') == 'Y'){
			var result = responseData.filter(obj=> obj.children_hospital_f == "Y");
		} else {
			var result = responseData.filter(obj=> obj.children_hospital_f == "N");
		}
		
		/**
		 * Normally you'd want to do something with the response data,
		 * but for this example we'll just log it to the console.
		 */
		console.log({ result });

	} catch (error) {
		console.error(error);
	}
	printResults(result);
	document.getElementById("results").style.border = "2px solid #000000";

	
}
    const stateForm = document.getElementById("state-form");
    stateForm.addEventListener("submit", handleFormSubmit);
