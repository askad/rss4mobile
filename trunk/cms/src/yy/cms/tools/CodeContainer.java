package yy.cms.tools;

import java.util.HashMap;
import java.util.Map;

public class CodeContainer {

	private static Map<String, Map<Integer, String>> codeContainer;
	public final static String CODE_WORKEXPR = "workexpr";
	public final static String CODE_DEGREE = "degree";
	public final static String CODE_LANGSKILL = "langskill";
	public final static String CODE_SDSKILL = "sdskill";
	public final static String CODE_TECHSKILL = "techskill";
	public final static String CODE_STABILITY = "stability";
	public final static String CODE_VIEWRESULT = "viewresult";
	private final static String BLANK = "";

	public final static int AUTH_ADMIN;
	static {
		AUTH_ADMIN = 100;
		// TODO init from DB

		codeContainer = new HashMap<String, Map<Integer, String>>();

		Map<Integer, String> workexpr = new HashMap<Integer, String>();
		workexpr.put(1, "No related Experience");
		workexpr.put(2, "1 Year");
		workexpr.put(3, "2 Year");
		workexpr.put(4, "3 Year");
		workexpr.put(5, "4 Years above");
		codeContainer.put(CODE_WORKEXPR, workexpr);

		Map<Integer, String> degree = new HashMap<Integer, String>();
		degree.put(1, "Bachelor");
		degree.put(2, "Master");
		degree.put(3, "MBA");
		degree.put(4, "Doctor");
		degree.put(5, "Associate");
		codeContainer.put(CODE_DEGREE, degree);

		Map<Integer, String> langskill = new HashMap<Integer, String>();
		langskill.put(1, "01 No Meet Expectation");
		langskill.put(2, "02 Nearly Meet Expectation");
		langskill.put(3, "03 Qualified");
		langskill.put(4, "04 Excced Expectation");
		langskill.put(5, "05 Outstanding");
		codeContainer.put(CODE_LANGSKILL, langskill);

		codeContainer.put(CODE_SDSKILL, langskill);
		codeContainer.put(CODE_TECHSKILL, langskill);
		codeContainer.put(CODE_STABILITY, langskill);

		Map<Integer, String> viewresult = new HashMap<Integer, String>();
		viewresult.put(1, "01 Reject (Resume not qualified)");
		viewresult.put(2, "02 Need interview");
		viewresult.put(3, "03 Failed (Rejected by interview)");
		viewresult.put(4,
				"04 Pending(Not good enough, consider to arrange 2nd round interview if no other good candidates)");
		viewresult
				.put(5,
						"05 Consider (In shot list, will consider the candidate when we have no candidates in offer stage to offer)");
		viewresult.put(6, "06 Offer (need to give offer need to give offer on we have the headcount)");
		viewresult.put(7, "07 Refuse (not receive offer)");
		viewresult.put(8, "08 Hire");
		codeContainer.put(CODE_VIEWRESULT, viewresult);

	}

	public static String getCodeDesc(String codeName, int codeValue) {

		Map<Integer, String> valueMap = codeContainer.get(codeName);
		if (valueMap.containsKey(codeValue)) {
			return valueMap.get(codeValue);
		}
		return BLANK;
	}

}
