'use client';

import { m } from 'framer-motion';

import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ComponentsView() {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container maxWidth="md">
        {/* Header */}
        <MotionContainer sx={{ textAlign: 'center', mb: 6 }}>
          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                fontFamily: "'Merriweather', serif",
                fontSize: { xs: '2rem', md: '4.5rem' },
                fontWeight: 500,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              WRITING & REPORTING
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 500,
                textAlign: 'left',
                mb: 1,
              }}
            >
              MVHS Students Desensitized By Repeating Email Threats
            </Typography>
          </m.div>

          <Typography
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '1.75rem',
              color: '#ccc',
              mb: 0.5,
              textAlign: 'left',
            }}
          >
            Fifth email threat targets MVHS
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '0.95rem',
              
              color: '#bbb',
              textAlign: 'left',
            }}
          >
            By: Maahi Dev & Tala Grimaldi
          </Typography>
        </MotionContainer>

        {/* Article Body */}
        <Box sx={{ fontFamily: "'Roboto Slab', serif" }}>
          <Typography
            paragraph
            sx={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: '1.05rem',
              lineHeight: 1.9,

              mb: 3,
            }}
          >
            “All students will be dismissed.”
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            The announcement blared through the intercom, but instead of fear or concern, the halls
            and classrooms filled with cheers. Since the start of the 2024-2025 school year, Monta
            Vista has faced multiple shooter threats via email, resulting in class cancellations and
            drawing investigations from the Santa Clara County Sheriff’s Department and Federal Law
            Enforcement. What initially sparked confusion has now, through repeated incidents,
            turned into a reaction more like celebration.
          </Typography>

          {/* Image 1 */}
          <Box sx={{ my: 4 }}>
            <img
              src="/assets/article/email-threats.png"
              alt="Email Threats"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Box>

          <Typography paragraph sx={bodyStyle}>
            Monta Vista has received five threats with malicious intent this school year, occuring
            on Nov. 8, 2024, Dec. 9, 2024, Feb. 13, 2025, March 14, 2025, and most recently, March
            19, 2025. The school’s response typically involves an announcement over the PA system,
            informing students that authorities are involved and safety measures are being taken.
            Students were dismissed early after being sheltered in classrooms during some of these
            incidents, while others allowed students to resume their regular school day. Throughout
            each occurrence, administration has communicated with parents and staff via email,
            assuring them that investigations were ongoing and student safety remained the priority.
            Despite these assurances, the frequency of these threats has led to a troubling trend;
            students are becoming increasingly desensitized to what should be a cause for a serious
            concern.
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            Freshman Alexandra Perrault notices this growing desensitization has led students to
            view these threats less as a serious safety issue and more as an opportunity for an
            unexpected break from school, where the focus changes from concern to convenience.
          </Typography>

          <Typography paragraph sx={italicStyle}>
            “With the threats, I’m seeing how people are reacting, it’s like, ‘Yay, we get to go
            home, we get to play videogames, we get more free time,’” Perrault said. “I feel like we
            don’t really think of it as a threat anymore. It’s not hitting us on a personal level.”
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            This shift in student responses is something English teacher Rachel Cassar has observed
            as well, noticing that the repeated falsehoods of these threats may be a reason for the
            desensitization.
          </Typography>

          <Typography paragraph sx={italicStyle}>
            "From what I’ve heard, especially from my older students who have experienced similar
            threats in the past, no threat has led to anyone at Monta Vista being physically harmed,
            so students’ first reaction may be to question their validity,” Cassar said. “This might
            explain why some students have not been emotionally affected in the ways I expected as a
            new member of the MV community.”
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            However, Junior Jillian Ju's personal encounter with one of these threats showcases a
            contrast to the casual attitude students have developed. While on an El Estoque trip in
            New York, Ju received one of the threatening emails from someone with the handle “Jacob
            Jackoff.”
          </Typography>

          <Typography paragraph sx={italicStyle}>
            “I get email notifications for speech, so I saw the pop-up,” Ju said. “I was like, ‘Oh
            my god, is this for me?’ and asked if anyone else got this.”
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            Initially concerned they had been personally targeted, Ju later realized the email had
            been sent to all of the speech team’s officers. Not wanting to examine the gory content
            themself, they reached out to their friends, asking if they could do it for them.
          </Typography>

          <Typography paragraph sx={italicStyle}>
            “Having that in your inbox creates some weird responsibility,” Ju said. “I’m glad my
            friends were around, they definitely reacted more calmly than I would have alone.”
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            Ju’s experience shows how the impact of these threats can vary based on one’s proximity
            to them. While students have grown accustomed to them, those directly involved can still
            feel the weight of this incident.
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            However, despite the growing desensitization among students, these threats have also
            caused disruptions in the school’s schedule, with some leading to early dismissal for
            all students and staff.
          </Typography>

          <Typography paragraph sx={italicStyle}>
            “Personally, I care a lot about deadlines and how fast and effectively I get schoolwork
            done,” Perrault said. “So when I have a setback like this, it sort of messes everything
            up.”
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            This disturbance has led to teachers having to make adjustments to make sure students
            stay on track, such as Ju’s AP Chinese teacher.
          </Typography>

          <Typography paragraph sx={italicStyle}>
            “For AP Chinese, our teacher has to send us these emails with like, Ed puzzles for us to
            do at home, because, she says, ‘We can't fall behind,’” Ju said.
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            Despite these disruptions, Cassar appreciates the school’s approach to prioritizing
            safety, even in undesirable circumstances.
          </Typography>

          {/* Image 2 */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Box sx={{ my: 4 }}>
                <img
                  src="/assets/article/stats-report.png"
                  alt="Statistics Report"
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography paragraph sx={italicStyle}>
                "I do really appreciate that we consistently err on the side of caution,” Cassar
                said. “Even though cancelling career day, for example, must have been very
                challenging for the administration to manage, I appreciate that they’re doing their
                best to look out for the safety of everyone at the school. I want to recognize the
                sacrifices that this required.”
              </Typography>
            </Grid>
          </Grid>

          <Typography paragraph sx={bodyStyle}>
            Reflecting Monta Vista’s prioritization of safety, according to the{' '}
            <a
              href="https://nces.ed.gov/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#4dabf7' }}
            >
              National Center for Education Statistics
            </a>
            , during the 2021-22 school year, 92% of public schools said they had a formal plan to
            prepare for and respond to multi-country or worldwide pandemic disease. Schools had
            written plans describing the procedures to be performed in various other crisis
            scenarios as well, including active shooters (96%), natural disasters (96%), suicide
            threats or incidents (94%), and bomb threats (92%). This showcases schools’ dedication
            to safety protocols for such events.
          </Typography>

          <Typography paragraph sx={bodyStyle}>
            Ultimately, with more threats compared to previous years, Monta Vista is in a place
            where safety measures and student well-being have to be balanced with maintaining
            academic continuity. While administration continues to work with law enforcement to
            identify those responsible, the normalization of these threats raises a concern of how
            it’s desensitizing students, and dangering them to a potential real event.
          </Typography>

          <Typography paragraph sx={italicStyle}>
            “I feel like this behavior is a symptom of gun culture in America, of how we treat
            student safety,” Ju said. “But at the same time, in our sheltered environment, we don't
            have a great perspective on what violence actually means.”
          </Typography>
        </Box>

        {/* Contact Form */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: "'Merriweather', serif",
              fontWeight: 600,
              mb: 3,
            }}
          >
            Contact Maahi
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                InputProps={{ sx: { bgcolor: 'white', borderRadius: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// Shared styles
const bodyStyle = {
  fontFamily: "'Roboto Slab', serif",
  fontSize: '1.2rem',
  lineHeight: 1.9,
  mb: 3,
};

const italicStyle = {
  ...bodyStyle,
  fontStyle: 'italic',
};
