
import { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from "react-native";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSolution = async () => {
    if (question.length < 5) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("http://192.168.31.89:5000/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ problem: question })
      });

      const data = await res.json();
      setAnswer(data.data);
    } catch (err) {
      setAnswer({ error: "Something went wrong" });
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Solvio 💡</Text>

      <TextInput
        placeholder="Enter your problem..."
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
      />

      <Button title={loading ? "Solving..." : "Solve"} onPress={getSolution} />

      {answer && !answer.error && (
        <View style={styles.result}>
          <Text style={styles.heading}>Low Cost Fix:</Text>
          {answer.low_cost_fix?.map((item, i) => (
            <Text key={i}>• {item}</Text>
          ))}

          <Text style={styles.heading}>Advanced Fix:</Text>
          {answer.advanced_fix?.map((item, i) => (
            <Text key={i}>• {item}</Text>
          ))}

          <Text style={styles.heading}>Estimated Cost:</Text>
          <Text>{answer.estimated_cost}</Text>

          <Text style={styles.heading}>Avoid If Possible:</Text>
          <Text>{answer.avoid_if_possible}</Text>

          <Text style={styles.heading}>Need Professional:</Text>
          <Text>{answer.need_professional ? "Yes" : "No"}</Text>
        </View>
      )}

      {answer?.error && <Text>{answer.error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  result: { marginTop: 20 },
  heading: { fontWeight: "bold", marginTop: 10 }
});
