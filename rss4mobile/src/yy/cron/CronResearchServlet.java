package yy.cron;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CronResearchServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String flg = req.getHeader("X-AppEngine-Cron");
        if (flg != null && flg.trim().equalsIgnoreCase("true")) {

        }
    }
}
//Ã·Ωª ±£¨image
/*
        var l = function() {
            if ($IE8) {
                $E("comment_check_img").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image_ie8.php?" + new Date().valueOf()
            } else {
                $E("comment_check_img").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image.php?" + new Date().valueOf()
            }
            m("img")
        };
*/
//post
/*
                        var p = {
                            comment: $E("commentArea").value,
                            login_name: $E("login_name").value,
                            login_pass: $E("login_pass").value,
                            check: $E("login_check").value,
                            comment_anonyous: $E("comment_anonyous").value
                        };
                        if ($E("login_remember")) {
                            p.login_remember = $E("login_remember").checked
                        }
                        Utils.Cookie.setCookie("remberloginname", escape($E("login_name").value), 2400, "/", ".blog.sina.com.cn");
                        c.post(p);
                        g = false
*/
/*
var b = "http://blog.sina.com.cn/s/comment_" + this.articleid + "_" + this.page + ".html";
var scope = {
    $setDomain : true,
    $uid : "1066341254",
    $PRODUCT_NAME : "blog7",        //blog7photo,blog7icp
    $pageid : "article",
    $key :  "73239e0c82051d9eef7dca258247e432",
    $uhost : "fangqinrong",
$sort_id : "117",
$flag2008 : "0",
$articleid : "3f8f138601008pr8" ,
$pn_x_rank : "0" ,
$private : {"pageset":0,"tj":0,"adver":0,"sms":0,"ad":0,"blogsize":0,"cms":0,"hidecms":0,"top":0,"invitationset":0,"p4p":0,"spamcms":0,"init7":0,"quote":0,"foot":0},
$isCommentAllow : "0",
$album_pic : "",
$x_quote_c : "0",
    $is_photo_vip : 0
};
var $encrypt_code = "88f9c4054b70afbe645695d4c87d4247";
var __SINAPRO__ = "";
var MbloguM = "0";
scope.component_lists={"1":{"size":210,"list":[901,909,903,904,47]},"2":{"size":730,"list":[920]}};
scope.formatInfo=1;
scope.UserPic=[{"pid":null,"repeat":"no-repeat","align-h":"top","align-v":"top","apply":0},{"pid":null,"repeat":null,"align-h":null,"align-v":null,"apply":null},{"pid":null,"repeat":"no-repeat","align-h":"top","align-v":"top","apply":0}];
scope.UserColor="";
scope.backgroundcolor="";
scope.tpl="1_2";




*/