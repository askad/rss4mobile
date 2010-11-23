package as3.yy.cms.pages
{
	import as3.yy.cms.base.BasePage;
	[Bindable]
	[RemoteClass(alias="yy.cms.pages.LoginPage")]
	public class LoginPage extends BasePage
	{
		public var uname:String;//when remote,must public
		public var pword:String;

		public function LoginPage()
		{
			super(this);
		}
	}
}