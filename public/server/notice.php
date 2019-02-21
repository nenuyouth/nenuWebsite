<?php
header("Content-Type: text/html; charset=utf-8");
function httpget($url)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}
$url = $_GET["url"];
$id = substr($url, -19, 10);
chdir("notice");
echo '开始匹配' . $id . "\n";
$noticeHtml = httpget("http://mid.nenu.edu.cn:8080/xxhbwx/HttpReq?appid=2&url=$url");
$noticeContent = preg_replace(["/<br\/>/", "/[\r\n\t]/", "/<!--.*?-->/"], ["#@", "", ""], $noticeHtml);
echo '通知内容是：' . $noticeContent;
$noticeRule = '/(.*)\${6}.*ent\">(.*)<p s.*?ht;\">(.*?)<\/p/';
preg_match_all($noticeRule, $noticeContent, $noticeData);
var_dump($noticeData);
$text = preg_replace(["/(<\/p><p.*?>)|(#@)/", "/<\/p>|<p(.*)?>/"], ["\n", ""], $noticeData[2][0]);
$footer = preg_replace("/#@/", "\n", $noticeData[3][0]);
preg_match_all('/附件：(?:[0-9]．)?/', $text, $temp, PREG_OFFSET_CAPTURE);
var_dump($temp);
if ($temp[0]) {
    $position = $temp[0][0][1];
    var_dump($position);
    echo "找到附件！<br />";
    $attachmentString = preg_replace("/\n/", "", substr($text, $position + 9));
    $mutiAttachmentRule = "/(?:[0-9]．)?.*?f=\"(.*?)\".*?\">(.*?)\.(.*?)<\/a>/";
    preg_match_all($mutiAttachmentRule, $attachmentString, $attachmentData);
    var_dump($attachmentData);
    $attachment = array();
    echo "附件匹配成功！<br />";
    $dir = iconv("UTF-8", "GBK", $id);
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
        echo "创建文件夹" . $id . "成功。<br />";
    } else {
        echo "文件夹" . $id . "已存在。<br />";
    }
    for ($j = 0; $j < count($attachmentData[0]); $j++) {
        $attchUrl = 'http://www.nenu.edu.cn' . $attachmentData[1][$j];
        $attchFile = file_get_contents($attchUrl);
        $attchName = pathinfo($attchUrl)["basename"];
        file_put_contents("$id/" . $attchName, $attchFile);
        $attachment[$j] = array('tag' => 'doc', 'url' => 'https://mrhope.top/mpServer/notice/' . $id . '/' . $attchName, 'docName' => $attachmentData[2][$j] . '.' . $attachmentData[3][$j]);
    }
    $text = substr($text, 0, $position);
    $notice = array("title" => $noticeData[1][0], "content" => $text, "attachment" => $attachment, "footer" => $footer);
} else {
    echo '没有附件！<br />';
    $notice = array("title" => $noticeData[1][0], "content" => $text, "footer" => $footer);
}
echo $text;
$tableRule = '/(?:\<div.*?\>)?\<table.*?\>(?=.|\n)*?\<\/table>(?:\<\/div>)?/';
// $tableRule='/(?:\<div.*?\>)?((?:\<table.*?\>)(?=.|\n)*?(?:\<\/table>))(?:\<\/div>)?/';
preg_match_all($tableRule, $text, $tableData);
var_dump($tableData);
for ($l = 0; $l < count($tableData[0]); $l++) {
    $tableStartPosition = strpos($text, $tableData[0][$l]);
    $tableEndPosition = $tableStartPosition + strlen($tableData[0][$l]);
    $tableString = preg_replace("/\n/", "", $tableData[0][$l]);
    $tableRule2 = '/<table.*?\><tbody>(.*?)<\/tbody><\/table>/';
    preg_match_all($tableRule2, $tableString, $tableData2);
    var_dump($tableData2);
    $tableString2 = $tableData2[1][0];
    $tableRule3 = '/<tr.*?\>(.*?)<\/tr>/';
    preg_match_all($tableRule3, $tableString2, $tableData3);
    var_dump($tableData3);
}
var_dump($notice);
$noticeString = json_encode($notice, 320);
$noticeResult = file_put_contents("$id.json", $noticeString);
if ($noticeResult) {
    echo '通知' . $id . "生成成功!<br />";
}
