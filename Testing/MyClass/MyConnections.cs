using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace GLAU_Exam.MyClass
{
    public class MyConnections
    {
        public static MySqlConnection MyConnectionString(string type)
        {
            MySqlConnection m = new MySqlConnection();

            if (type == "Student")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["StudentDataBaseServer"].ConnectionString;
            }
            if (type == "Attendance")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["StudentDataBaseServer"].ConnectionString;
            }
            else if (type == "Exam")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["ExamServer"].ConnectionString;
            }
            else if (type == "Lms")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["AdmissionStudentDataBaseServer"].ConnectionString;
            }
            else if (type == "Salary")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["Salary"].ConnectionString;
            }
            else if (type == "requisition")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["StaffRequisition"].ConnectionString;
            }
            else if (type == "gri")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["grievance"].ConnectionString;
            }
            else if(type== "SummerServer")
            {
                m.ConnectionString = ConfigurationManager.ConnectionStrings["SummerServer"].ConnectionString;
            }
            return m;
        }

        public static DataTable Select(string query, string connectionName)
        {
            MySqlDataAdapter da2 = new MySqlDataAdapter(query, MyConnectionString(connectionName));
            DataTable dt2 = new DataTable();
            da2.Fill(dt2);

            return dt2;
        }
        public static int DeleteInsertUpdate(string query, string connectionName)
        {
            MySqlDataAdapter da2 = new MySqlDataAdapter(query, MyConnectionString(connectionName));
            DataTable dt2 = new DataTable();
            int res = da2.Fill(dt2);

            return res;
        }
    }
}