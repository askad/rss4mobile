package as3.yy.cms.pages
{
	import as3.yy.cms.base.BasePage;
	[Bindable]
	[RemoteClass(alias="yy.cms.pages.LoginPage")]
	public class LoginPage extends BasePage
	{
		private var uname:String;
		private var pword:String;

		public function LoginPage()
		{
			super(this);
		}
		public function getUname():String
		{
			return uname;
		}

		public function setUname(uname:String):void
		{
			this.uname=uname;
		}

		public function getPword():String
		{
			return pword;
		}

		public function setPword(pword:String):void
		{
			this.pword=pword;
		}
	}
}