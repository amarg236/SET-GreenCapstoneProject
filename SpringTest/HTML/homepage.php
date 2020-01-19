<!DOCTYPE html>
<html lang="en-US">
<head>
	<link rel="stylesheet" href="cs/style.css">
</head>
<body>
	<?php
		echo "php test<br/>";
		for($i=1;$i<11;$i++){
			echo $i."<br/>";
		}
		echo "end php test<br/>";
	?>
	<div id="main">
	<p>Hello World</p>
	</div>
	<!-- Load React. -->
	<!-- Note: when deploying, replace "development.js" with "production.min.js". -->
	<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
	<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
	<!-- Load things you're using here -->
	<!--My load order/reasons is as follows: 
		functions.js - all utility functions
		frontend/text.js - this was to handle a text area that would be synchronized, here because it has to be
		sheets/dnd.js - This was the definition for a dnd sheet, functioned like text.js does in concept because of how the site was
		app.js - this was the function call to render using the text and dnd frontend and sheet.
		
		So in our specific senario we just need to do all the dirty work in what would be functions and app.js
		I did it this way for this case because of an intent to switch out the sheet and frontend used at a later date. -->
	<script src="script.js"></script>
</body>
</html>