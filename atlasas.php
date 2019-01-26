<?php
// @formatter:off
$document = new DOMDocument();
if (
	$document->loadXML( file_get_contents( 'atlasas.svg' ) ) &&
	( $nodes = $document->getElementsByTagName( 'svg' ) )
) {
// @formatter:on

	// we strip XML header and output only root <svg> elemnt
	echo $document->saveXML( $nodes[0] );

}
