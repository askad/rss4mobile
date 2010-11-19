package as3.yy.cms.base
{

	[Bindable]
	[RemoteClass(alias="yy.cms.base.BasePage")]
	public class BasePage
	{
		private var errorMsg:String;
		private var inforMsg:String;
		private var pageName:String;
		private var usrId:String;

		// can't instance this
		public function BasePage(self:BasePage)
		{
			if (self != this)
			{
				throw new ArgumentError("Can't new Base instance!");
			}
		}

		public function getErrorMsg():String
		{
			return errorMsg;
		}

		public function setErrorMsg(errorMsg:String):void
		{
			this.errorMsg=errorMsg;
		}

		public function getInforMsg():String
		{
			return inforMsg;
		}

		public function setInforMsg(inforMsg:String):void
		{
			this.inforMsg=inforMsg;
		}

		public function getPageName():String
		{
			return pageName;
		}

		public function setPageName(pageName:String):void
		{
			this.pageName=pageName;
		}
	}
}
