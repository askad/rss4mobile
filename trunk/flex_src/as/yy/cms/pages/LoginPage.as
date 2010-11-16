package yy.cms.pages
{
	[Bindable]
	[RemoteClass(alias="yy.cms.pages.LoginPage")]
	public class LoginPage extends BasePage
	{
		private var uname:String;
		private var pword:String;

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