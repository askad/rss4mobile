package yy.dao;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import yy.util.UserInfor;

public class GeneralDao {
    public Query prepareQuery(Class c, String field, String type) {
        PersistenceManager pm = PMF.getInstance().getPersistenceManager();
        Query query = pm.newQuery(c);
        query.setFilter(field + " == param");
        query.declareParameters(type + " param");
        return query;
    }

    public List queryByUserId(Class c) {
        return query(c, "userId", "String", UserInfor.getUserId());
    }

    public List query(Class c, String field, String type, String value) {
        Query query = prepareQuery(c, field, type);
        return (List) query.execute(value);
    }

    public List query(Class c, String field, String type, Long value) {
        Query query = prepareQuery(c, field, type);
        return (List) query.execute(value);
    }
}
