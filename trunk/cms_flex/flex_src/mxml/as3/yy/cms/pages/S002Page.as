package as3.yy.cms.pages
{
	import as3.yy.cms.base.BasePage;
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="yy.cms.pages.S002Page")]
	public class S002Page extends BasePage
	{
		public var userList:ArrayCollection;
		public var authList:ArrayCollection;
		public function S002Page()
		{
			super(this);
		}
	}
}