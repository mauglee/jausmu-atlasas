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
			<div class="go-cell">
				<div class="btn-group segments">
					<div class="btn btn-success" id="bavigatorSegment"></div>
					<button class="btn btn-success dropdown-toggle" type="button" id="dropdownSegment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Segmentas
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownSegment">
						<a class="dropdown-item" href="#svg" data-segment="1">1</a>
						<a class="dropdown-item" href="#svg" data-segment="2">2</a>
						<a class="dropdown-item" href="#svg" data-segment="3">3</a>
						<a class="dropdown-item" href="#svg" data-segment="4">4</a>
						<a class="dropdown-item" href="#svg" data-segment="5">5</a>
						<a class="dropdown-item" href="#svg" data-segment="6">6</a>
						<a class="dropdown-item" href="#svg" data-segment="7">7</a>
						<a class="dropdown-item" href="#svg" data-segment="8">8</a>
						<a class="dropdown-item" href="#svg" data-segment="9">9</a>
						<a class="dropdown-item" href="#svg" data-segment="10">10</a>
						<a class="dropdown-item" href="#svg" data-segment="11">11</a>
						<a class="dropdown-item" href="#svg" data-segment="12">12</a>
						<a class="dropdown-item" href="#svg" data-segment="13">13</a>
						<a class="dropdown-item" href="#svg" data-segment="14">14</a>
						<a class="dropdown-item" href="#svg" data-segment="15">15</a>
						<a class="dropdown-item" href="#svg" data-segment="16">16</a>
						<a class="dropdown-item" href="#svg" data-segment="17">17</a>
						<a class="dropdown-item" href="#svg" data-segment="18">18</a>
						<a class="dropdown-item" href="#svg" data-segment="19">19</a>
						<a class="dropdown-item" href="#svg" data-segment="20">20</a>
						<a class="dropdown-item" href="#svg" data-segment="21">21</a>
						<a class="dropdown-item" href="#svg" data-segment="22">22</a>
						<a class="dropdown-item" href="#svg" data-segment="23">23</a>
						<a class="dropdown-item" href="#svg" data-segment="24">24</a>
					</div>
				</div>
				<div class="btn-group levels">
					<div class="btn btn-success" id="bavigatorLevel"></div>
					<button class="btn btn-success dropdown-toggle" type="button" id="dropdownLevel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Sluoksnis
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownLevel">
						<a class="dropdown-item" href="#svg" data-level="1">A</a>
						<a class="dropdown-item" href="#svg" data-level="2">B</a>
						<a class="dropdown-item" href="#svg" data-level="3">C</a>
						<a class="dropdown-item" href="#svg" data-level="4">D</a>
						<a class="dropdown-item" href="#svg" data-level="5">E</a>
						<a class="dropdown-item" href="#svg" data-level="6">F</a>
						<a class="dropdown-item" href="#svg" data-level="7">G</a>
						<a class="dropdown-item" href="#svg" data-level="8">H</a>
						<a class="dropdown-item" href="#svg" data-level="9">I</a>
						<a class="dropdown-item" href="#svg" data-level="10">J</a>
					</div>
				</div>
			</div>
			<div class="back-to-website btn-group" role="group">
				<a href="/" class="btn btn-primary">
					<i class="fas fa-home"></i>
				</a>
				<a href="/" class="help btn btn-primary">
					<i class="fas fa-question"></i>
				</a>
			</div>

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