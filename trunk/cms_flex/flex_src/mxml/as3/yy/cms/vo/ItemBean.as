package as3.yy.cms.vo
{
	[Bindable]
	[RemoteClass(alias="yy.cms.vo.ItemBean")]
	public class ItemBean
	{
		public function ItemBean(name:String, value:String):void{
			this.name = name;
			this.value = value;
		}
		public var name:String;
		public var value:String;
	}
}