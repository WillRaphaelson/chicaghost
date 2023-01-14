"""Welcome to Pynecone! This file outlines the steps to create a basic app."""
from pcconfig import config
import pynecone as pc
import requests
import pandas as pd
import re


url = "https://cta-delay-preds-ijzgin3xfq-uc.a.run.app/alerts"

r = requests.get(url)

load = r.json()

len(load["alerts"])

app_array = []
for _ , i in enumerate(load["alerts"]):
    app_array += [{
        "Line": i["ServiceName"], 
        "Description" : re.sub('<[^<]+?>', '', i["FullDescription"]),
        "Duration": i["Duration"],
        }]

frame = pd.DataFrame(app_array)


class State(pc.State):
    """The app state."""

    pass


def index():
    return pc.center(
        pc.vstack(
            pc.heading("Welcome to Chicaghost!"),
            # pc.box("Get started by editing ", pc.code(filename, font_size="1em")),
            pc.data_table(
                data=frame,
                pagination=True,
                search=True,
                sort=True,
                resizable=True
                ),
            # spacing="1.5em",
            # font_size="2em",
        ),
        # padding_top="10%",
    )


# Add state and page to the app.
app = pc.App(state=State)
app.add_page(index)
app.compile()
