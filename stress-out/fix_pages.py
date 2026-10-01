with open('stress-out/src/pages/EmployeesPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<StatusBadge status={(["healthy", "attention", "overload", "no-data", "paused"].includes(emp.status) ? emp.status : "healthy")} />', '<StatusBadge status={(["healthy", "attention", "overload", "no-data", "paused"].includes(emp.status) ? emp.status : "healthy") as "healthy" | "attention" | "overload" | "no-data" | "paused"} />')

with open('stress-out/src/pages/EmployeesPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('stress-out/src/pages/EmployeeDetailPage.tsx', 'r', encoding='utf-8') as f:
    detail = f.read()

detail = detail.replace('<StatusBadge status={(["healthy", "attention", "overload", "no-data", "paused"].includes(employee.status) ? employee.status : "healthy")} />', '<StatusBadge status={(["healthy", "attention", "overload", "no-data", "paused"].includes(employee.status) ? employee.status : "healthy") as "healthy" | "attention" | "overload" | "no-data" | "paused"} />')

with open('stress-out/src/pages/EmployeeDetailPage.tsx', 'w', encoding='utf-8') as f:
    f.write(detail)

print('Updated page files with type assertions successfully.')
