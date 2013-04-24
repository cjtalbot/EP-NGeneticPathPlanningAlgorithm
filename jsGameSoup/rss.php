<?php
require_once('magpierss/rss_fetch.inc');

function rss_to_html($feed_uri) {
	$feed = fetch_rss($feed_uri);
	
	if(count($feed->items) == 0)
		return;
	
	foreach($feed->items as $item)
	{
		//$url = "http://myabsoluteurl.com/";
		//$ret = preg_replace('/((?:href|src) *= *[\'"](?!(http|ftp)))/i', "$1$url", $ret);
		$desc_rel_to_abs = preg_replace_callback('/((?:href|src) *= *[\'"](?!(http|ftp)))(.*?)([\'"])/i', "rel_to_abs", $item['description']);
		
		print "<div class='rss_item'>";
		print "	<div class='date'>" . $item['title'] . "</div>";
		print "	<div class='title'><h2><a href='" . $item['link'] . "'>" . $item['title'] . "</a></h2></div>";
		print "	<div class='body'>" . $desc_rel_to_abs . "</div>";
		print "</div'>";
	}
}

// http://nashruddin.com/PHP_Script_for_Converting_Relative_to_Absolute_URL
function rel_to_abs($rel, $base:W
)
{
	/* return if already absolute URL */
	if (parse_url($rel, PHP_URL_SCHEME) != '') return $rel;

	/* queries and anchors */
	if ($rel[0]=='#' || $rel[0]=='?') return $base.$rel;

	/* parse base URL and convert to local variables:
	   $scheme, $host, $path */
	extract(parse_url($base));

	/* remove non-directory element from path */
	$path = preg_replace('#/[^/]*$#', '', $path);

	/* destroy path if relative url points to root */
	if ($rel[0] == '/') $path = '';

	/* dirty absolute URL */
	$abs = "$host$path/$rel";

	/* replace '//' or '/./' or '/foo/../' with '/' */
	$re = array('#(/\.?/)#', '#/(?!\.\.)[^/]+/\.\./#');
	for($n=1; $n>0; $abs=preg_replace($re, '/', $abs, -1, $n)) {}

	/* absolute URL is ready! */
	return $scheme.'://'.$abs;
}

// USE THIS STYLE:

class PhpHex2Str
{
    private $strings;

    private static function x_hex2str($hex) {
        $hex = substr($hex[0], 1);
        $str = '';
        for($i=0;$i < strlen($hex);$i+=2) {
            $str.=chr(hexdec(substr($hex,$i,2)));
        }
        return $str;
    }

    public function decode($strings = null) {
        $this->strings = (string) $strings;
        return preg_replace_callback('#\%[a-zA-Z0-9]{2}#', 'PhpHex2Str::x_hex2str', $this->strings);
    }
}

// Exemple
$obj = new PhpHex2Str;

$strings = $obj->decode($strings);
var_dump($strings);

?>
