<script lang="ts">
	import { Card, Input, Label, Range } from "flowbite-svelte";


</script>

<div class="items-center mt-10">
    <Card size="lg" class="mx-auto p-2">
        <h1>Smart Finance Calculator</h1>
        <form action="">
            <div class="flex flex-row max-w-full">
                <Label>
                    <span>Car Price (RM)</span>
                    <Input>
                        <input type="number" />
                    </Input>
                </Label>
                <Label>
                    <span>Downpayment (RM)</span>
                    <Input>
                        <input type="number" />
                    </Input>
                </Label>
                <Label>
                    <span>Interest Rate (RM)</span>
                    <Input>
                        <input type="number" />
                    </Input>
                </Label>
                <Label>
                    <span>Loan Tenure (RM)</span>
                    <Range />
                </Label>
            </div>
        </form>
    </Card>
</div>
