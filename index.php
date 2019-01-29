<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link
			href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
			crossorigin="anonymous">
	<link
			rel="stylesheet"
			href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
			integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
			crossorigin="anonymous">
	<link rel="stylesheet" href="main.css<?= is_file( 'main.css' ) ? '?v=' . filemtime( 'main.css' ) : '' ?>">

	<title>Atlasas</title>

</head>
<body>
	<a href="#result" class="edit-post btn btn-primary hidden">
		<i class="fas fa-edit"></i>
	</a>
	<div id="atlasas">
		<div id="svg">
			<div class="zoom btn-group" role="group">
				<button type="button" class="out btn btn-primary">
					<i class="fas fa-search-minus"></i>
				</button>
				<button type="button" class="orig btn btn-primary">
					<i class="fas fa-sync-alt"></i>
				</button>
				<button type="button" class="in btn btn-primary">
					<i class="fas fa-search-plus"></i>
				</button>
			</div>
			<a href="/" class="back-to-website btn btn-primary">
				<i class="fas fa-home"></i>
			</a>
			<?php include_once 'atlasas.php' ?>
		</div>
		<div id="result"></div>
	</div>

	<script
			src="https://code.jquery.com/jquery-3.3.1.min.js"
			integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
			crossorigin="anonymous"></script>
	<script
			src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
			integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
			crossorigin="anonymous"></script>
	<script
			src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
			integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
			crossorigin="anonymous"></script>
	<script
			src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
			integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
			crossorigin="anonymous"></script>

	<script src="config.min.js<?= is_file( 'config.min.js' ) ? '?v=' . filemtime( 'config.min.js' ) : '' ?>"></script>
	<script src="scripts.min.js<?= is_file( 'scripts.js' ) ? '?v=' . filemtime( 'scripts.js' ) : '' ?>"></script>

</body>
</html>