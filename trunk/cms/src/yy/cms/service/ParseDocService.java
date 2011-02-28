package yy.cms.service;

import org.htmlparser.Node;
import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.NodeClassFilter;
import org.htmlparser.tags.Div;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;

public class ParseDocService {

	private String iPath;
	private String decoding;

	public static void main(String[] args) {
		ParseDocService p =new ParseDocService();
		p.iPath = "C:/Documents and Settings/yyang21/Desktop/cms/03 [朱博文]简历_智联招聘.html";
		p.decoding = "UTF-8";
		p.parse();
	}

	private void parse() {
		Parser myParser;
		try {
			myParser = new Parser(iPath);
			myParser.setEncoding(decoding);

			NodeFilter divFilter = new NodeClassFilter(Div.class);
			NodeList nodeList = myParser.parse(divFilter);

			Node[] nodes = nodeList.toNodeArray();
			for (Node node : nodes) {
				Div div = (Div) node;
				String className = div.getAttribute("class");
				if (className != null && className.equals("name")) {
					System.out.println(div.getChildrenHTML());
				}
				if (className != null && className.equals("baseinfo")) {
					System.out.println(div.getChildrenHTML());
					break;
				}
			}

		} catch (ParserException e) {
			e.printStackTrace();
		}
	}

	public void getDivContent(String attr, String name) {

	}
}
