package yy.cms.servlet;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import yy.cms.tools.Commons;
import yy.cms.tools.PageDispatcher;

public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private final static int maxPostSize = 10 * 1024 * 1024;// 10m

	private final static int cacheSize = 200 * 1024;// 200k

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(cacheSize);

		ServletFileUpload servletFileUpload = new ServletFileUpload(factory);
		servletFileUpload.setSizeMax(maxPostSize);
		//servletFileUpload.setHeaderEncoding("utf-8");

		List files = null;

		if (servletFileUpload.isMultipartContent(req)) {
			try {

				files = servletFileUpload.parseRequest(req);
				Iterator iter = files.iterator();
				while (iter.hasNext()) {
					FileItem item = (FileItem) iter.next();
					if (!item.isFormField()) {
						//String path=this.getServletContext().getRealPath("/upload")
						// new FileReader(SystemConfig.getRealPath()+"WEB-INF/url.txt");
						item.write(new File(Commons.UPLOAD_TEMP_PATH + item.getName()));
						System.out.println(item.getName());
					}
				}
			} catch (FileUploadException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PageDispatcher.dispatcherByPath("/404.html", req, resp);
	}
}
