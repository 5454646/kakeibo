import { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

// カテゴリ
const expenseCategories = ["食費", "日用品", "交通費", "交際費", "趣味", "その他"];
const incomeCategories = ["給料", "副収入", "お小遣い", "その他"];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 日付の月初・月末取得
const getMonthRange = (dateStr) => {
  const date = dateStr ? new Date(dateStr) : new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  return {
    start: first.toISOString().slice(0, 10),
    end: last.toISOString().slice(0, 10),
  };
};

const Record = () => {
  // 入力用
  const [expense, setExpense] = useState({ date: "", reason: "", category: expenseCategories[0], amount: "" });
  const [income, setIncome] = useState({ date: "", source: "", category: incomeCategories[0], amount: "" });

  // 表示用
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  // 今月の範囲
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 7);
  });

  // 合計
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const balance = totalIncome - totalExpense;

  // データ取得
  useEffect(() => {
    const { start, end } = getMonthRange(month + "-01");
    // 支出取得
    fetch(`${API_BASE_URL}/expenses?from=${start}&to=${end}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch(() => setExpenses([]));
    // 収入取得
    fetch(`${API_BASE_URL}/incomes?from=${start}&to=${end}`)
      .then((res) => res.json())
      .then((data) => setIncomes(data))
      .catch(() => setIncomes([]));
  }, [month]);
  useEffect(() => {
      // APIをfetchする(呼び出す)
      fetch("http://localhost:8080/api", { method: "GET" })
        // レスポンスのデータ形式をjsonに設定
        .then((res) => res.json())
        // APIから渡されるレスポンスデータ(data)をstateにセットする
        .then((data) => {
          setStone(data);
        });
    }, []);


  // 支出追加
  const handleAddExpense = async () => {
    if (!expense.date || !expense.reason || !expense.amount) return;
    console.log("Adding expense:", expense);
    // APIにPOSTリクエスト
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (res.ok) {
      setExpense({ date: "", reason: "", category: expenseCategories[0], amount: "" });
      // 再取得
      const { start, end } = getMonthRange(month + "-01");
      console.log("Fetching expenses for:", start, end);
      fetch(`${API_BASE_URL}/expenses?from=${start}&to=${end}`)
        .then((res) => res.json())
        .then((data) => setExpenses(data));
    }
  };

  // 収入追加
  const handleAddIncome = async () => {
    if (!income.date || !income.source || !income.amount) return;
    console.log("Adding income:", income);
    // APIにPOSTリクエスト
    const res = await fetch(`${API_BASE_URL}/incomes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(income),
    });
    if (res.ok) {
      setIncome({ date: "", source: "", category: incomeCategories[0], amount: "" });
      // 再取得
      const { start, end } = getMonthRange(month + "-01");
      fetch(`${API_BASE_URL}/incomes?from=${start}&to=${end}`)
        .then((res) => res.json())
        .then((data) => setIncomes(data));
    }
  };

  return (
    <Box maxW="900px" mx="auto" p={6} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="lg" mb={6}>今月の収支概要</Heading>
      <Box mb={4} display="flex" alignItems="center" gap="8px">
        <Text fontWeight="bold">表示月：</Text>
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
        />
      </Box>

      {/* 支出 */}
      <Box mb={6} p={4} border="1px solid #eee" borderRadius={8} bg="#f9f9f9">
        <Heading size="md" mb={2}>支出の登録</Heading>
        <Box mb={2} display="flex" flexWrap="wrap" gap="8px">
          <input type="date" value={expense.date} onChange={e => setExpense({ ...expense, date: e.target.value })} />
          <input type="text" placeholder="使用理由" value={expense.reason} onChange={e => setExpense({ ...expense, reason: e.target.value })} />
          <select value={expense.category} onChange={e => setExpense({ ...expense, category: e.target.value })}>
            {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="number" min="0" placeholder="金額" value={expense.amount} onChange={e => setExpense({ ...expense, amount: e.target.value })} style={{ width: 100 }} />
          <button
            onClick={handleAddExpense}
            style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer" }}
          >追加</button>
        </Box>
        <Box as="table" width="100%" mb={2} border="1px solid #eee" borderRadius="4px" bg="white">
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th>日付</th>
              <th>理由</th>
              <th>カテゴリ</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, idx) => (
              <tr key={idx}>
                <td>{e.date}</td>
                <td>{e.reason}</td>
                <td>{e.category}</td>
                <td>{Number(e.amount).toLocaleString()} 円</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>

      {/* 収入 */}
      <Box mb={6} p={4} border="1px solid #eee" borderRadius={8} bg="#f9f9f9">
        <Heading size="md" mb={2}>収入の登録</Heading>
        <Box mb={2} display="flex" flexWrap="wrap" gap="8px">
          <input type="date" value={income.date} onChange={e => setIncome({ ...income, date: e.target.value })} />
          <input type="text" placeholder="収入理由" value={income.source} onChange={e => setIncome({ ...income, source: e.target.value })} />
          <select value={income.category} onChange={e => setIncome({ ...income, category: e.target.value })}>
            {incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="number" min="0" placeholder="金額" value={income.amount} onChange={e => setIncome({ ...income, amount: e.target.value })} style={{ width: 100 }} />
          <button
            onClick={handleAddIncome}
            style={{ background: "#319795", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer" }}
          >追加</button>
        </Box>
        <Box as="table" width="100%" mb={2} border="1px solid #eee" borderRadius="4px" bg="white">
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th>日付</th>
              <th>理由</th>
              <th>カテゴリ</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((i, idx) => (
              <tr key={idx}>
                <td>{i.date}</td>
                <td>{i.source}</td>
                <td>{i.category}</td>
                <td>{Number(i.amount).toLocaleString()} 円</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>

      {/* 合計 */}
      <Box p={4} border="1px solid #eee" borderRadius={8} bg="#f1f5f9">
        <Heading size="md" mb={2}>今月の合計</Heading>
        <Text mb={1}>収入合計：{totalIncome.toLocaleString()} 円</Text>
        <Text mb={1}>支出合計：{totalExpense.toLocaleString()} 円</Text>
        <Text fontWeight="bold">残高：{balance.toLocaleString()} 円</Text>
      </Box>
    </Box>
  );
};

export default Record;