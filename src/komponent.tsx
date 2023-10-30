import React, { useState } from 'react';

function DisplayAfterClickComponent(){
	const [isDisplayed, setIsDisplayed] = useState(true);

	function ToggleIsDisplayed(){
		setIsDisplayed((prev) => !prev)
	}

	return <div>
		<button onClick={ToggleIsDisplayed}>Click Me!</button>
		{isDisplayed && <p>Hello World!</p>}
	</div>
}

export default DisplayAfterClickComponent