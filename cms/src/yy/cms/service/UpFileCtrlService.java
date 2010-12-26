package yy.cms.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

import yy.cms.tools.Commons;

public class UpFileCtrlService {
	public boolean isExistFile(String path) {

		File f = new File(Commons.UPLOAD_TEMP_PATH + path);
		if (f.exists() && f.isFile()) {
			return true;
		}
		return false;
	}
	
	public void parseFile(String path){
		
	}
	

    /**
     * 读取一个文件到字符串里.
     * 
     * @param sFileName
     *            文件名
     * @param sEncode
     *            String
     * @return 文件内容
     */
    private String readTextFile(String sFileName, String sEncode) {
        StringBuffer sbStr = new StringBuffer();

        try {
            File ff = new File(sFileName);
            InputStreamReader read = new InputStreamReader(new FileInputStream(
                            ff), sEncode);
            BufferedReader ins = new BufferedReader(read);

            String dataLine = "";
            while (null != (dataLine = ins.readLine())) {
                sbStr.append(dataLine);
                sbStr.append("\r\n");
            }

            ins.close();
        }
        catch (Exception e) {
        }

        return sbStr.toString();
    }
}
