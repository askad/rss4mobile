package as3.yy.cms.pages
{
	import as3.yy.cms.base.BasePage;
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="yy.cms.pages.S001Page")]
	public class S001Page extends BasePage
	{
		public var menuList:ArrayCollection;
		public function S001Page()
		{
			super(this);
		}
	}
}