@ECHO OFF
SET lines_file_num=0
SET lines_total_len=0
FOR /R %%f IN (*.java) DO (
    SET /A lines_file_num+=1
    SET lines_file_len=0
    FOR /F "usebackq" %%l IN ("%%f") DO SET /A lines_file_len+=1
    SET /A lines_total_len+=lines_file_len
)
ECHO Found %lines_file_num% files, %lines_total_len% lines total.
pause