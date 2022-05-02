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

		/**
		 * Normally you'd want to do something with the response data,
		 * but for this example we'll just log it to the console.
		 */
		console.log({ responseData });

	} catch (error) {
		console.error(error);
	}
}
    const stateForm = document.getElementById("state-form");
    stateForm.addEventListener("submit", handleFormSubmit);
