package as3.yy.cms.pages
{
	import as3.yy.cms.base.BasePage;
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="yy.cms.pages.S000Page")]
	public class S000Page extends BasePage
	{
		public var menunameList:ArrayCollection;
		public var menuvalueList:ArrayCollection;
		public function S000Page()
		{
			super(this);
		}
	}
}