using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.IO;
using System.Text;

namespace GLAU_Exam.MyClass
{
    public class Export
    {
        public static string ToTitle(string Text)
        {
            return System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(Text.ToLower());
        }

        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "GLA" + DateTime.Now.Year + "UNI" + DateTime.Now.Month.ToString().PadLeft(2, '0') + "VER" + DateTime.Now.Day.ToString().PadLeft(2, '0') + "SITY" + DateTime.Now.Hour.ToString().PadLeft(2, '0');
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "GLA" + DateTime.Now.Year + "UNI" + DateTime.Now.Month.ToString().PadLeft(2, '0') + "VER" + DateTime.Now.Day.ToString().PadLeft(2, '0') + "SITY" + DateTime.Now.Hour.ToString().PadLeft(2, '0');
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
        public static string GetSession()
        {
            string q = "Select * from current_session";
            DataTable dtempsub = MyConnections.Select(q, "Student");

            return dtempsub.Rows[0][0].ToString();
        }
        public static string GetMACAddress()
        {
            NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
            String sMacAddress = string.Empty;
            foreach (NetworkInterface adapter in nics)
            {
                if (sMacAddress == String.Empty)// only return MAC Address from first card  
                {
                    IPInterfaceProperties properties = adapter.GetIPProperties();
                    sMacAddress = adapter.GetPhysicalAddress().ToString();
                }
            }
            //string[] computer_name = System.Net.Dns.GetHostEntry(System.Web.HttpContext.Current.Request.ServerVariables["remote_addr"]).HostName.Split(new Char[] { '.' });
            //return computer_name[0].ToString().ToUpper() + "-" + sMacAddress;
            return System.Environment.MachineName + "-" + sMacAddress;
        }

        public static string GetLanIPAddress()
        {
            return System.Web.HttpContext.Current.Request.UserHostAddress;
        }
        public static string EncryptOrDecrypt(string text)
        {
            string newText = "";
            int key = 7;
            for (int i = 0; i < text.Length; i++)
            {
                int charValue = Convert.ToInt32(text[i]); //get the ASCII value of the character
                charValue ^= key; //xor the value

                newText += char.ConvertFromUtf32(charValue); //convert back to string
            }

            return newText;
        }
        public static void DeleteAttendanceInformation(string Course, string Semester, string Section, string Subject, string Batch, string Student_ID, string ForDate, string Status, string ActivityType, string EmployeeID, string EmloyeeName)
        {
            string q = "insert into delete_attendance_info (Session,Course,Semester,Section,Subject,Batch,Student_ID,ForDate,Status,ActivityType,EmployeeID,EmloyeeName,IP,MAC,DoneOn) values ('" + GetSession() + "','" + Course + "','" + Semester + "','" + Section + "','" + Subject + "','" + Batch + "','" + Student_ID + "'," + ForDate + ",'" + Status + "','" + ActivityType + "','" + EmployeeID + "','" + EmloyeeName + "','" + GetLanIPAddress() + "','" + GetMACAddress() + "',now())";
            MyConnections.DeleteInsertUpdate(q, "Student");
        }
        
    }
}