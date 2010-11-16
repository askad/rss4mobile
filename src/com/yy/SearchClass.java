package com.yy;

import java.util.ArrayList;
import java.util.List;

public class SearchClass{
		static{
			System.out.println("load yy Search");
	}
	public int checkUser(String name,String pass){
		System.out.println(name + " in check " + pass);
		return 4868;
	}
	public List getGridData(){
		ArrayList<GridVO> l = new ArrayList<GridVO>();
		GridVO gvo = new GridVO();
		gvo.setDgname("ssss一樣");
		gvo.setDgtitle("breaf");
		gvo.setDgtime("2009/10/10");
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		l.add(gvo);
		//System.out.println("load yy getGridData");
		return l;
	}
}
